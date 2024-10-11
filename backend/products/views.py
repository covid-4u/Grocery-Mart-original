from django.shortcuts import render
from rest_framework import viewsets
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.decorators import api_view
from rest_framework import viewsets, status
from django.shortcuts import get_object_or_404
from rest_framework.decorators import action
from django.contrib.auth.models import User
from .models import Product,Category,Order,CartItem,Cart,OrderItem
from .serializers import ProductSerializer,CategorySerializer,CartSerializer,OrderSerializer,CartItemSerializer,OrderItemSerializer



class ProductViewSet(viewsets.ModelViewSet):

    queryset = Product.objects.all()
    serializer_class = ProductSerializer

    def update(self, request, *args, **kwargs):
        instance = self.get_object()
        serializer = self.get_serializer(instance, data=request.data, partial=True)  # partial=True for partial updates
        serializer.is_valid(raise_exception=True)        

        return Response(serializer.data)
    
    def get_queryset(self):
        queryset = super().get_queryset()
        search_term = self.request.query_params.get('search', None)
        if search_term:
            queryset = queryset.filter(name__icontains=search_term)
        return queryset

class CategoryViewSet(viewsets.ModelViewSet):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer

    def update(self, request, *args, **kwargs):
        instance = self.get_object()
        serializer = self.get_serializer(instance, data=request.data, partial=True)  # partial=True for partial updates
        serializer.is_valid(raise_exception=True)        

        return Response(serializer.data)\
        
    def get_queryset(self):
        # Get the category name from query parameters
        category_name = self.request.query_params.get('name')
        if category_name:
            return Product.objects.filter(category__name=category_name)
        return Category.objects.all()  # Optionally return all products if no category is specified
    
class ProductsByCategoryView(APIView):
    def get(self, request, category_name):
        products = Product.objects.filter(category__name=category_name)
        serializer = ProductSerializer(products, many=True)
        return Response(serializer.data)

class CartViewSet(viewsets.ModelViewSet):
    queryset = Cart.objects.all()
    serializer_class = CartSerializer
    permission_classes = [IsAuthenticated]

    @action(detail=False, methods=['GET'])
    def by_authenticated_user(self, request):
        user = request.user
        cart = get_object_or_404(Cart, user=user)  # Use get_object_or_404 for better error handling
        serializer = self.get_serializer(cart)
        return Response(serializer.data)

    def get_queryset(self):
        user = self.request.user
        return Cart.objects.filter(user=user)

class CartItemViewSet(viewsets.ModelViewSet):
    serializer_class = CartItemSerializer

    def get_queryset(self):
        user = self.request.user
        return CartItem.objects.filter(cart__user=user)

    def create(self, request, *args, **kwargs):
        user = request.user
        product_id = request.data.get("product")
        quantity = request.data.get("quantity", 1)

        if quantity <= 0:
            return Response({"error": "Quantity must be a positive integer."}, status=status.HTTP_400_BAD_REQUEST)

        product = get_object_or_404(Product, id=product_id)

        cart, _ = Cart.objects.get_or_create(user=user)

        cart_item, created = CartItem.objects.get_or_create(
            cart=cart,
            product=product,
            defaults={'quantity': quantity}
        )

        if not created:  # If the item already exists, update the quantity
            cart_item.quantity += quantity
            cart_item.save()

        return Response(CartItemSerializer(cart_item).data, status=status.HTTP_201_CREATED)

class OrderViewSet(viewsets.ModelViewSet):
    queryset = Order.objects.all()
    serializer_class = OrderSerializer
    permission_classes = [IsAuthenticated]

    def create(self, request, *args, **kwargs):
        cart, created = Cart.objects.get_or_create(user=request.user)
        cart_items = CartItem.objects.filter(cart=cart)

        if not cart_items.exists():
            return Response({"error": "Your cart is empty."}, status=status.HTTP_400_BAD_REQUEST)

        order = Order.objects.create(
            user=request.user,
            cart=cart,
            shipping_address=request.data.get('shipping_address'),
            payment_method=request.data.get('payment_method'),
        )

        total_price = 0
        for cart_item in cart_items:
            order_item = OrderItem.objects.create(
                order=order,
                product=cart_item.product,
                quantity=cart_item.quantity,
                total_price=cart_item.total_price,
            )
            total_price += order_item.total_price

            # Update product stock
            cart_item.product.stock -= cart_item.quantity
            cart_item.product.save()

        order.total_price = total_price
        order.save()

        cart_items.delete()  # Clear cart items after placing the order

        serializer = self.get_serializer(order)
        return Response(serializer.data, status=status.HTTP_201_CREATED)



class ProductSearchView(APIView):
    def post(self, request, *args, **kwargs):
        user_input = request.data.get('search_term', None)

        if not user_input:
            return Response({"error": "No input provided"}, status=400)

        # Find products by category
        products_by_category = Product.objects.filter(category__name__icontains=user_input)
        print("Products by category:", products_by_category.values())

        # Find products by name
        products_by_name = Product.objects.filter(name__icontains=user_input)
        print("Products by name:", products_by_name.values())

        # Combine the querysets and remove duplicates
        products = products_by_category | products_by_name
        products = products.distinct()

        if products.exists():
            serializer = ProductSerializer(products, many=True)
            return Response(serializer.data, status=200)
        else:
            return Response({"error": "No products found"}, status=404)




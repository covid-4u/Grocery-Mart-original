from django.db import models
from django.contrib.auth.models import User
from django.db import transaction

class Category(models.Model):
    name = models.CharField(max_length=255, unique=True, null=True)
    image = models.ImageField(upload_to='categories/', null=True)

    def __str__(self):
        return self.name

class Product(models.Model):
    name = models.CharField(max_length=255, null=True)
    category = models.ForeignKey(Category, on_delete=models.CASCADE, related_name='products', null=True)
    description = models.TextField(null=True, blank=True)
    price = models.DecimalField(max_digits=10, decimal_places=2, default=0.00, null=True)
    stock = models.PositiveSmallIntegerField(default=1, null=True)
    ratings = models.DecimalField(max_digits=3, decimal_places=2, default=0.00, null=True)
    image = models.ImageField(upload_to='products/', null=True)

    def __str__(self):
        return self.name

class Cart(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, null=True)

    def total_items(self):
        return sum(item.quantity for item in self.cartitem_set.all())

    def total_price(self):
        return sum(item.total_price for item in self.cartitem_set.all())

class CartItem(models.Model):
    cart = models.ForeignKey(Cart, on_delete=models.CASCADE)
    product = models.ForeignKey(Product, on_delete=models.CASCADE, null=True)
    quantity = models.PositiveIntegerField(default=1)
    total_price = models.DecimalField(max_digits=10, decimal_places=2, default=0.00, null=True)

    def save(self, *args, **kwargs):
        if self.product:  # Check if the product is set
            self.total_price = self.product.price * self.quantity
        else:
            self.total_price = 0.00  # Handle case where product is None
        super(CartItem, self).save(*args, **kwargs)

    def __str__(self):
        return f"CartItem {self.id} - {self.product.name}"

class Order(models.Model):
    STATUS_CHOICES = [
        ('P', 'Pending'),
        ('C', 'Completed'),
        ('S', 'Shipped'),
        ('F', 'Failed'),
        ('R', 'Refunded'),
        ('O', 'Out for Delivery'),
    ]
    
    PAYMENT_CHOICES = [
        ('COD', 'Cash on Delivery'),
        ('CC', 'Credit Card'),
        ('PP', 'PayPal'),
        ('BT', 'Bank Transfer'),
    ]
    
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    cart = models.ForeignKey(Cart, on_delete=models.CASCADE)  # Link to the Cart
    total_price = models.DecimalField(max_digits=10, decimal_places=2, default=0.00, null=True)
    shipping_address = models.CharField(max_length=255, null=True)
    status = models.CharField(max_length=1, choices=STATUS_CHOICES, default='P', null=True)
    payment_method = models.CharField(max_length=3, choices=PAYMENT_CHOICES, default='COD', null=True)
    created_at = models.DateTimeField(auto_now_add=True, null=True)

    def save(self, *args, **kwargs):
        with transaction.atomic():
            if self.cart:  # Ensure the cart is present
                # Calculate total price from cart items
                self.total_price = sum(item.total_price for item in self.cart.cartitem_set.all())
            else:
                self.total_price = 0.00  # Default to 0 if no cart

            super(Order, self).save(*args, **kwargs)
    def __str__(self):
        return f"Order {self.id} - {self.user.username}"


class OrderItem(models.Model):
    order = models.ForeignKey(Order, related_name='order_items', on_delete=models.CASCADE)
    product = models.ForeignKey(Product, on_delete=models.CASCADE)
    quantity = models.PositiveIntegerField(default=1)
    total_price = models.DecimalField(max_digits=10, decimal_places=2, default=0.00)

    def save(self, *args, **kwargs):
        self.total_price = self.product.price * self.quantity
        super(OrderItem, self).save(*args, **kwargs)

    def __str__(self):
        return f"OrderItem {self.id} - {self.product.name}"

from django.urls import path, include
from .views import (
    ProductViewSet,
    CategoryViewSet,
    ProductsByCategoryView,
    OrderViewSet,
    ProductSearchView,
    CartItemViewSet,
    CartViewSet
)
from django.conf import settings
from django.conf.urls.static import static
from rest_framework.routers import DefaultRouter

# Setting up the router for the API
router = DefaultRouter()
router.register(r'products', ProductViewSet, basename='product')
router.register(r'category', CategoryViewSet, basename='category')  # Updated to plural form for consistency
router.register(r'orders', OrderViewSet, basename='order')
router.register(r'cart-items', CartItemViewSet, basename='cartitem')
router.register(r'carts', CartViewSet, basename='cart')

urlpatterns = [
    path('', include(router.urls)),  # Include the router URLs
    path('product-search/', ProductSearchView.as_view(), name='product-search'),  # Added name for clarity
    path('products/category/<str:category_name>/', ProductsByCategoryView.as_view(), name='products-by-category'),
]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)

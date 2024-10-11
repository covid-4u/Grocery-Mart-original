from django.urls import path
from .views import SignupView, CustomTokenObtainPairView,check_user

urlpatterns = [
    path('signup/', SignupView.as_view(), name='signup'),
    path('login/', CustomTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('check_user/', check_user, name='check_user'),
]

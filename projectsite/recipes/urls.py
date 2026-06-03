from django.urls import path
from . import views

urlpatterns = [
    path('', views.home, name='home'),
    path('create/', views.create_recipe, name='create_recipe'),
    path('recipe/<int:pk>/', views.recipe_detail, name='recipe_detail'),
    path('update/<int:pk>/', views.update_recipe, name='update_recipe'),
    path('delete/<int:pk>/', views.delete_recipe, name='delete_recipe'),
    path('recipe/<int:pk>/review/', views.add_review, name='add_review'),
]
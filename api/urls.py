from django.urls import path

from . import views


urlpatterns = [
    path('test', views.test),
    path('drawings', views.drawing_list),
    path('drawing/<int:user_id>/', views.drawing_detail),
    path('save_drawing', views.save_drawing),
    path('get_image/<int:user_id>', views.get_image),
]

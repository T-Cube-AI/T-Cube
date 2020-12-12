from django.conf.urls import url
from train_data import views

urlpatterns = [
    url('', views.PredictTillDate.as_view()),
]
from django.conf.urls import url
from upload_data import views

urlpatterns = [
    url('', views.PredictTillDate.as_view()),
]
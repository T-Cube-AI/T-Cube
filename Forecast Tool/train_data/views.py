from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
from train_data.services.services import service_result
import traceback


class PredictTillDate(APIView):
    @staticmethod
    def post(request):
        try:
            # file_storage_utility.createFolder(admin.origin_path)
            # file_storage_utility.deleteFolder(admin.origin_path)
            end_date = request.data['date']
            place = request.data['region']
            country = request.data['country']
            if isinstance(end_date, str):
                end_date = end_date.strip()
            if isinstance(place, str):
                place = place.lower()
                place = place.replace(" ", "-")
            if isinstance(country, str):
                country = country.lower()
            if end_date and place:
                services = service_result(place, end_date, country)
                # print(services, "raaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")
                return Response({"data": services}, status=status.HTTP_200_OK)

            else:
                return Response({"data": "place/end_date/country does not Exists"}, status=status.HTTP_400_BAD_REQUEST)
        except Exception as e:
            traceback.format_exc()
            return Response({"message": "Exception Error " + str(e)})

from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
from upload_data.services.services import service_result
import traceback
from upload_data.utils import file_storage_utility

from upload_data import admin


class PredictTillDate(APIView):
    @staticmethod
    def post(request):
        try:
            # file_storage_utility.createFolder(admin.origin_path)
            # file_storage_utility.deleteFolder(admin.origin_path)
            file = request.data['file']
            population = request.data['population']
            if isinstance(file, str):
                file = file.strip()
            if isinstance(population, str):
                population = int(population)
            if file and population:
                file = file_storage_utility.saveFileWithTimestamp(file, admin.origin_path)
                services = service_result(file, population)
            # country = request.data['country']
            # if isinstance(end_date, str):
            #     end_date = end_date.strip()
            # if isinstance(place, str):
            #     place = place.lower()
            #     place = place.replace(" ", "-")
            # if isinstance(country, str):
            #     country = country.lower()
            # if end_date and place:
            #     services = service_result(place, end_date, country)
                return Response({"data": services}, status=status.HTTP_200_OK)

            else:
                return Response({"data": "Population or the data uploaded has issue"}, status=status.HTTP_400_BAD_REQUEST)
        except Exception as e:
            traceback.format_exc()
            return Response({"message": "Exception Error " + str(e)})

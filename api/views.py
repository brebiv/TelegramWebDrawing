from django.http import JsonResponse
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from rest_framework.parsers import JSONParser

from api.serializers import DrawingSerializer
from bot.models import User
from bot.handlers import bot

from django.conf import settings


def test(request):
    # print(request)
    # print(request.GET['uid'])
    uid = request.GET['uid']
    user = User.objects.get(user_id=uid)
    bot.send_message(settings.MY_ID, f"@{user.username} openned website!")
    return JsonResponse({"status": "fucking great"})


@api_view(['GET'])
def drawing_list(request):
    if request.method == 'GET':
        drawings = [u.drawing for u in User.objects.all() if u.drawing != '']
        # serializer = DrawingSerializer(drawings, many=True)
        # return Response(serializer.data)
        return Response(drawings)


@api_view(['GET'])
def drawing_detail(request, user_id: int):
    if request.method == 'GET':
        try:
            canvas_data = User.objects.get(user_id=user_id).canvas_data
        except User.DoesNotExist:
            return Response({"status": 404}, status=status.HTTP_404_NOT_FOUND)

        if len(canvas_data) == 0:
            return Response({"canvas_data": "none"})
        else:
            return Response({"canvas_data": canvas_data})


@api_view(['POST'])
def save_drawing(request):
    if request.method == 'POST':
        data = JSONParser().parse(request)
        serializer = DrawingSerializer(data=data)
        if serializer.is_valid():
            user_id = serializer.validated_data.get('user_id')
            canvas_data = serializer.validated_data.get('canvas_data')
            data_url = serializer.validated_data.get('data_url')
            try:
                user = User.objects.get(user_id=user_id)
                user.canvas_data = canvas_data
                user.drawing = data_url
                user.save()
                return Response("Done!", status=status.HTTP_200_OK)
            except User.DoesNotExist:
                return Response("User not found", status=status.HTTP_404_NOT_FOUND)


@api_view(['GET'])
def get_image(request, user_id: int):
    if request.method == 'GET':
        try:
            drawing = User.objects.get(user_id=user_id).drawing
            # print(drawing)
            return Response({'image': drawing})
        except User.DoesNotExist:
            return Response({"status": 404}, status=status.HTTP_404_NOT_FOUND)

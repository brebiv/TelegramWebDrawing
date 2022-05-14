from rest_framework import serializers


class DrawingSerializer(serializers.Serializer):

    canvas_data = serializers.CharField()
    data_url = serializers.CharField()
    user_id = serializers.IntegerField()

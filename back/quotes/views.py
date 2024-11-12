from rest_framework import generics
from rest_framework.response import Response
from rest_framework import status
from .models import Quote
from .serializers import QuoteSerializer


class QuoteListCreateView(generics.GenericAPIView):
    serializer_class = QuoteSerializer
    queryset = Quote.objects.all()

    def get(self, request, *args, **kwargs):
        quotes = Quote.objects.all()
        serializer = self.get_serializer(quotes, many=True)
        return Response(serializer.data)

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

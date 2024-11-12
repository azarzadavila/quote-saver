from django.urls import path
from quotes.views import QuoteListCreateView

urlpatterns = [
    path("quotes/", QuoteListCreateView.as_view(), name="quotes"),
]

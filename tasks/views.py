from rest_framework import viewsets
from tasks.models import Task
from tasks.serializer import TaskSerializer

# Create your views here.

class TaskView(viewsets.ModelViewSet):
    serializer_class = TaskSerializer
    
    def get_queryset(self):
        done_query = self.request.query_params.get('done')
        
        if done_query is not None:
            value_bool=done_query.lower()=="true"
            return Task.objects.filter(done=value_bool)
        return Task.objects.all()


from rest_framework import serializers
from .models import Employee, Attendance
from datetime import date

class EmployeeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Employee
        fields = '__all__'

    def validate_email(self, value):
        if Employee.objects.filter(email=value).exists():
            raise serializers.ValidationError("Email already exists")
        return value


class AttendanceSerializer(serializers.ModelSerializer):
    employee_name = serializers.CharField(source='employee.full_name', read_only=True)

    class Meta:
        model = Attendance
        fields = '__all__'
        validators = []

    def validate_date(self, value):
        if value > date.today():
            raise serializers.ValidationError("Date cannot be in the future")
        return value

    def validate(self, data):
        employee = data.get('employee')
        date_value = data.get('date')

        if Attendance.objects.filter(employee=employee, date=date_value).exists():
            raise serializers.ValidationError(
                "Attendance already marked for this employee on this date"
            )

        return data
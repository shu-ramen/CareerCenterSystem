# Generated by Django 2.1.7 on 2020-02-23 07:44

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('library', '0005_notice'),
    ]

    operations = [
        migrations.AlterField(
            model_name='notice',
            name='content',
            field=models.CharField(max_length=1024),
        ),
    ]
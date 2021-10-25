FROM python:alpine3.7

EXPOSE 5000/tcp

WORKDIR /app

COPY ./requirement.txt /app/requirement.txt

RUN pip install -r requirement.txt

COPY . /app

CMD ["python", "./application.py"]
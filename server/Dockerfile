# Dockerfile
FROM gcc:latest

WORKDIR /app

COPY ./execute.sh /app/execute.sh

RUN chmod +x /app/execute.sh

CMD ["/bin/bash", "/app/execute.sh"]

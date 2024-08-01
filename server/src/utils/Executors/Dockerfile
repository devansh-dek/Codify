FROM gcc:latest

WORKDIR /app

COPY ./execute.sh /app/execute.sh
COPY ./code.cpp /app/code.cpp
COPY ./input.txt /app/input.txt  

RUN chmod +x /app/execute.sh

CMD ["/bin/bash", "/app/execute.sh"]

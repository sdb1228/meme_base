FROM elixir:latest

# We need to use a custom ppa, because the nodejs version shipped with debian stretch
# is ancient (v4.x.x).
RUN curl -sL -sL https://deb.nodesource.com/setup_12.x | bash - && \
    apt-get update && \
    apt-get -y upgrade && \
    apt-get -y install nodejs
RUN mix local.hex --force && \
    mix local.rebar --force

RUN mkdir /app
COPY . /app
WORKDIR /app

RUN mix deps.get
RUN cd assets && npm install

EXPOSE 4000
ENTRYPOINT ["/bin/bash", "./entrypoint.sh"]

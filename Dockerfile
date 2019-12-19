FROM debian:buster-slim

RUN apt-get update && \
  apt-get install -y git curl build-essential libpcre3 libpcre3-dev zlib1g zlib1g-dev libssl-dev && \
  mkdir -p /tmp/foobar && \
  cd /tmp/foobar && \
  git clone https://github.com/sergey-dryabzhinsky/nginx-rtmp-module.git && \
  curl -sS https://nginx.org/download/nginx-1.16.1.tar.gz > nginx-1.16.1.tar.gz && \
  tar -xf nginx-1.16.1.tar.gz && \
  cd nginx-1.16.1 && \
  ./configure --with-http_ssl_module --with-file-aio --add-module=../nginx-rtmp-module && \
  make -j 4 && \
  make install && \
  rm -rf /tmp/foobar

COPY nginx.conf /usr/local/nginx/conf/nginx.conf

RUN ln -sf /usr/local/nginx/sbin/nginx /usr/sbin/nginx

EXPOSE 1935 8080

CMD ["/usr/local/nginx/sbin/nginx", "-g", "'daemon off;'"]

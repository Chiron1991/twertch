# twertch
A _very_ simple self-hosted live streaming service.  
It takes an RTMP input stream and transforms it into an HLS output. Also comes with a simple web player!

## Disclaimer
This project was hackily hacked together during lunchtime as a proof of concept.  
:warning:_Do not use it if you care about traffic encryption, resource authorization or any other form of security!_:warning:

## Deploying it
The easiest way is to get a cheap VPS (checkout [Hetzner Cloud](https://www.hetzner.de/cloud) for best bang/$), install the Docker daemon on it and run it with `docker run -p 80:8080 -p 1935:1935 --detach --restart unless-stopped chiron1991/twertch`.

## Using it with OBS
Within the [Open Broadcaster Software's](https://obsproject.com/) settings, create a custom streaming target and set `rtmp://<your-domain>/stream` as your server. The stream key can be an arbitrary [a-Z0-9] string.  
Go to `http://<your-domain>` for the web player. Enter the stream key and hit 'Watch!'. You should see your stream now!
_Hint:_ There will most likely be a delay of 10-15 seconds. Whilst RTMP is (almost) delay-free, HLS is not.

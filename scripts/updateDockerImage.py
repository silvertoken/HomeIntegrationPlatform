import json, subprocess, docker, argparse

parser = argparse.ArgumentParser(description='Update docker images on a local registry from docker hub')
parser.add_argument('--image', dest='image', help='docker hub image name')
parser.add_argument('--tag', dest='tag', help='tag of the image')
parser.add_argument('--local', dest='local', help='local image name')
args = parser.parse_args()
image = args.image
local = args.local
tag = args.tag
registry = 'registry.localdomain'

print("Pulling remote image " + image + ':' + tag)
proc = subprocess.Popen(["docker", "manifest", "inspect", image + ':' + tag], shell=True, stdout=subprocess.PIPE)
client = docker.from_env()
manifest = json.loads(proc.communicate()[0])
for m in manifest['manifests']:
    if m['platform']['architecture'] == 'arm64':
        print("Found arm64")
        print('Pulling digested image')
        image = client.images.pull(image + '@' + m['digest'])
        imageId = image.short_id

        print('Tagging image ' + registry + '/' + local + ':' + tag)
        image.tag(registry + '/' + local, tag=tag)

        print('Pushing image to local registry')
        client.images.push(registry + '/' + local, tag)

        print('Removing local images with id ' + imageId.split(':')[1])
        client.images.remove(image=imageId, force=True)
        break
        
        




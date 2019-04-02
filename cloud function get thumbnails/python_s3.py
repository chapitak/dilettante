import boto3
import requests

session = boto3.Session(
    aws_access_key_id="key 여기",
    aws_secret_access_key="secret 여기" # 여기 나중에 분리하든가 하자 하드코딩하면 안된대.. 
    # aws_session_token=SESSION_TOKEN,
)
s3 = session.resource('s3')
# s3.create_bucket(Bucket='dilettante')
dilettante = s3.Bucket('dilettante')

# for object in dilettante.objects.all():
#     print(object)

def download_thumbnails_to_s3(request):
    """Responds to any HTTP request.
    Args:
        request (flask.Request): HTTP request object.
    Returns:
        The response text or any set of values that can be turned into a
        Response object using
        `make_response <http://flask.pocoo.org/docs/1.0/api/#flask.Flask.make_response>`.
    """
    response = requests.get(request.args.get('thumbnail_url'))
    thumb_filename = request.args.get('album_id')
    # print(response.content)
    if response.status_code == 200:
        # with open("./image.png", 'wb') as f:
        #     f.write(response.content)
        s3.Object('dilettante', thumb_filename + '.jpg').put(Body=response.content, ACL='public-read')

    """
    request_json = request.get_json()
    if request.args and 'message' in request.args:
        return request.args.get('message')
    elif request_json and 'message' in request_json:
        return request_json['message']
    else:
        return f'Hello World!'
        
    """
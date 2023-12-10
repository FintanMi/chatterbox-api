from django.contrib.auth.models import User
from .models import Post
from rest_framework import status
from rest_framework.test import APITestCase


class PostListViewTest(APITestCase):
    def setUp(self):
        User.objects.create_user(username='finn', password='pass')

    def test_can_list_posts(self):
        finn = User.objects.get(username='finn')
        Post.objects.create(owner=finn, title='a title')
        response = self.client.get('/posts/')
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_logged_in_user_can_create_post(self):
        self.client.login(username='finn', password='pass')
        response = self.client.post('/posts/', {'title': 'a title'})
        count = Post.objects.count()
        self.assertEqual(count, 0)
        self.assertEqual(response.status_code,
                         status.HTTP_405_METHOD_NOT_ALLOWED)

    def test_user_not_logged_in_cant_create_post(self):
        response = self.client.post('/post/', {'title': 'a title'})
        self.assertEqual(response.status_code,
                         status.HTTP_405_METHOD_NOT_ALLOWED)


class PostDetailViewTests(APITestCase):
    def setUp(self):
        sam = User.objects.create_user(username='sam', password='pass')
        alice = User.objects.create_user(username='alice', password='pass')
        Post.objects.create(
            owner=sam, title='a title', content='sams content'
        )
        Post.objects.create(
            owner=alice, title='a second title', content='alices content'
        )

    # def test_can_retreive_post_using_valid_id(self):
    #     response = self.client.get('/posts/1/')
    #     self.assertEqual(response.data['title'], 'a title')
    #     self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_cant_retreive_post_using_invalid_id(self):
        response = self.client.get('/posts/999/')
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_user_can_update_own_post(self):
        self.client.login(username='sam', password='pass')
        response = self.client.put('/posts/1/', {'title': 'a title'})
        post = Post.objects.filter(pk=1).first()
        self.assertEqual(post.title, 'a title')
        self.assertEqual(response.status_code,
                         status.HTTP_405_METHOD_NOT_ALLOWED)

    def test_user_cant_update_another_users_post(self):
        self.client.login(username='sam', password='pass')
        response = self.client.put('/posts/2/', {'title': 'another new title'})
        self.assertEqual(response.status_code,
                         status.HTTP_405_METHOD_NOT_ALLOWED)

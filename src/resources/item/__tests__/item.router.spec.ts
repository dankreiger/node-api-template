import router from '../item.router';

describe('item router', () => {
  test('has crud routes', () => {
    const routes = [
      { path: '/', method: 'get' },
      { path: '/:id', method: 'get' },
      { path: '/:id', method: 'delete' },
      { path: '/:id', method: 'put' },
      { path: '/', method: 'post' },
    ];

    routes.forEach(({ path, method }) => {
      const match = router.stack.find(
        (s) => s.route.path === path && s.route.methods[method]
      );
      expect(match).toBeTruthy();
    });
  });
});

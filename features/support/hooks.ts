import { After, AfterAll, Before, BeforeAll } from '@cucumber/cucumber';

BeforeAll({ name: 'Example BeforeAll' }, function () {
  console.log('BeforeAll');
});

Before({ name: 'Example Before' }, function () {
  console.log('Before');
});

After({ name: 'Example After' }, function () {
  console.log('After');
});

After({ name: 'Example After' }, function () {
  console.log('After');
});

AfterAll({ name: 'Example AfterAll' }, function () {
  console.log('AfterAll');
});

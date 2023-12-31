/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
import * as authentication from 'controllers/authentication';
import * as comments from 'controllers/comments';
import * as issues from 'controllers/issues';
import * as projects from 'controllers/projects';
import * as test from 'controllers/test';
import * as users from 'controllers/users';
import * as notes from 'controllers/notes';

import * as ai from 'controllers/openai';

export const attachPublicRoutes = (app: any): void => {
  if (process.env.NODE_ENV === 'test') {
    app.delete('/test/reset-database', test.resetDatabase);
    app.post('/test/create-account', test.createAccount);
  }

  app.get('/stream', ai.makeStream);
  app.post('/authentication/guest', authentication.createGuestAccount);
  app.post('/authentication/login', authentication.loginWithRecoveryCode);
};

export const attachPrivateRoutes = (app: any): void => {
  app.post('/prompt', ai.makePrompt);
  app.post('/prompts', ai.makeStreamPrompt);

  app.post('/comments', comments.create);
  app.put('/comments/:commentId', comments.update);
  app.delete('/comments/:commentId', comments.remove);

  app.get('/notes', notes.getProjectNotes);
  app.get('/notes/:noteId', notes.getNote);
  app.post('/notes', notes.create);
  app.put('/notes/:noteId', notes.update);
  app.delete('/notes/:noteId', notes.remove);

  app.get('/issues', issues.getProjectIssues);
  app.get('/issues/:issueId', issues.getIssueWithUsersAndComments);
  app.post('/issues', issues.create);
  app.put('/issues/:issueId', issues.update);
  app.delete('/issues/:issueId', issues.remove);

  app.get('/project', projects.getProjectWithUsersAndIssues);
  app.put('/project', projects.update);

  app.get('/currentUser', users.getCurrentUser);
};

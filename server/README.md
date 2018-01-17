# Question Answer
Question and answer application

# Route List

### Auth API
List of auth routes:

|           Route        |  HTTP  |             Description               |
| ---------------------- | ------ | ------------------------------------- |
| /signin             | POST     | Sign user                    |
| /signup         | POST    | Signup                    |

### Auth API
List of question-answer routes:

|           Route        |  HTTP  |             Description               |
| ---------------------- | ------ | ------------------------------------- |
| /qa/            | GET     | Get all question                   |
| /qa/5/question         | GET    | Get top 5 question                    |
| /qa/5/answer         | GET    | Get top 5 answer                    |
| /qa/5/question         | GET    | Get top 5 question                    |
| /by/:userId         | GET    | Get all question by one user                    |
| /qa/:question         | GET    | Get one question by id                    |
| /qa/:question/:answer         | GET    | Get all answer from question id                    |
| /qa/add         | POST    | Add new question                    |
| /qa/:question/vote         | POST    | Vote or downvote question                    |
| /qa/:question/top/:answer         | POST    | Choose top answer                   |
| /qa/:question/add/:answer         | POST    | Add new answer of an question                  |
| /qa/:question/:answer/vote         | POST    | Vote or downvote answer                   |
| /qa/:question         | PUT    | Edit question                 |
| /qa/:question/:answer         | PUT    | Edit answer                   |
| /qa/:question         | DELETE    | Delete answer                   |
| /qa/:question/:answer         | DELETE    | Delete answer                   |

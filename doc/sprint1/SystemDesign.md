<br><br><br>
# Bonfire <br> SYSTEM DESIGN DOCUMENT
### CSCC01, Ilir Dema <br> Collaborators: Ahmed Halat, Armand Sarkezians, Christian Liu, <br> David Petrov, Mohamed Halat
<br><br><br>

### Table of Contents
1. [CRC Card descriptions](#crc)
2. [Software Architecture Diagram](#diagram)

<br/><br/><br/>

## <a name="crc"></a>CRC Card descriptions
### AuthController
| Collaborators | Responsibilities |
| :---: | :--- |
| JwtStrategy<br> PassportStrategy <br> AuthService | RESTFUL: Register user, get user, login user |

### BoardController
| Collaborators | Responsibilities |
| :---: | :--- |
| AuthModule | RESTFUL: Get board, create board, update board |

### StateController
| Collaborators | Responsibilities |
| :---: | :--- |
| AuthModule | RESTFUL: Get state, create state, get state's cards |

### CardController
| Collaborators | Responsibilities |
| :---: | :--- |
| AuthModule | RESTFUL: Get card |

### AuthService
| Collaborators | Responsibilities |
| :---: | :--- |
| UserService <br>JwtService | Register/Login/Get user, validate password, create jwt |

### UserService
| Collaborators | Responsibilities |
| :---: | :--- |
| PrismaService | Get, create, update, delete user |

### BoardService
| Collaborators | Responsibilities |
| :---: | :--- |
| PrismaService | Get, create board <br> Find board's states |


### StateService
| Collaborators | Responsibilities |
| :---: | :--- |
| PrismaService | Get, create state <br> Find state's board <br> Get state's cards |


### CardService
| Collaborators | Responsibilities |
| :---: | :--- |
| PrismaService | Find card |

### PrismaService
| Collaborators | Responsibilities |
| :---: | :--- |
| - | Performs database queries |

### JwtStrategy
| Collaborators | Responsibilities | Parent |
| :---: | :--- | :--- |
| AuthService | Validate user authentication tokens | PassportStrategy |

### PassportStrategy
| Collaborators | Responsibilities |
| :---: | :--- |
| AuthService | Defines authentication method used for Nest.Js |

## <a name="diagram"></a>Software Architecture Diagram
  Nest.js is a fully featured JavaScript framework for building web applications with the MVC design pattern. We used Nest.JS for our controllers however, instead of using integrated views with Nest.js, we decided to use Vue as a more powerful frontend framework.

  Then we decided to use a MySQL database since we wanted a relational database. We also decided to use Prisma for our Model interaction, and its a db ORM aded to NestJs.

![Software Architecture Diagram](./assets/architecture%20diagram.png)

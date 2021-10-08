# SYSTEM DESIGN DOCUMENT

Include a high-level description of your classes using CRC Cards: what they are, what their responsibilities are, and what is the interaction between them.
● You can use the following template for the CRC Cards:
● The description of system interaction with the environment should indicate any dependencies or assump- tions made about the operating environment of the system. E.g. OS, programming language compilers and virtual machine, DB’s, network configuration, etc.
● Describe the architecture of the system, that is the most abstract view of how your system is divided into components and how those components are interconnected. The architecture should be described with a diagram showing components and how they are

Class Name:
Parent Class (if any): List the parent class if applicable Subclasses (if any): List all the subclasses separated by a comma
Responsibilities: Collaborators:
● List responsibilities ● List all your collaborators
related (or equivalent in words). Beware of designs based on a large number of components, they may signal a design that is overly complex.
● The system decomposition should relate the system architecture to the detailed design, to identify the role of each component in the higher-level architectural view. Description of strategy for dealing with errors and exceptional cases (e.g. invalid user input, network or external system failure) that might arise in the use of the software. For anticipated errors and exceptions, a summary of how the software will respond in these situations.

## Software Architecture Diagram
  Nest.js is a fully featured JavaScript framework for building web applications with the MVC design pattern. However, instead of using integrated views with Nest.js, we decided to use Vue as it is a more powerful front-end framework.

  Then we decided to use a MySQL database since we wanted a relational database. We also decided to use Prisma, a db ORM to connect our application to our database.

![Software Architecture Diagram](./assets/architecture%20diagram.png)


# Grading
## System Design (PDF or MD file or another suitable format) (max 10 marks)
  - Cover Page and Table of Contents (max 2 marks)
    2 marks = both are present
    1 mark  = at least one is present
    0 marks = None present

    Your Mark: _

  - CRC Cards [or equivalent, if the team is not using CRC) (max 4 marks)
    - 4 marks = Class names and Collaborators have matching names and responsibilities are stated clearly
    - 3 marks = At least one of the class names does not match the collaborator names or the responsibilities for at least one class are unclear
    - 2 marks = Two class names do not match the collaborator names or the responsibilities of two or more classes are not stated or are unclear
    - 1 mark  = The majority of class names do not match the collaborator names or the responsibilities of the majority of the classes are not stated or are unclear
    - 0 marks = No CRC provided or the provided document does not match the CRC model

    Your Mark: _

  - Software Architecture Diagram (max 4 marks)
    - 4 marks = The Architecture Diagram is present, it is formatted using proper graphic symbols, and it follows a known Architecture diagram.
    If the system architecture does not follow the MVC (studied in class), a web link or reference has been provided to support the used architecture
    - 3 marks = The Architecture Diagram is present, it is not formatted well, and it follows somewhat a known Architecture diagram.
    If the system architecture does not follow the MVC (studied in class), a web link or reference has been provided to support the used architecture
    - 2 marks = The Architecture Diagram is present, it is not formatted well, or it does not follow a known Architecture diagram.
    A web link or reference has been provided, but it does not support the used architecture
    - 1 mark  = The Architecture Diagram is present, it is not formatted well, and it is unclear what Architecture it follows.
    There is no web link or other reference lending support to the presented diagram.
    - 0 marks = No diagram present or the presented document does not look like a software architecture diagram

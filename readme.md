# Cars Creation
**Functional Requirements**
- It must be possible to create a new car.
- It must be possible to list all categories.

**Business Rules**
- It must not be possible to create a new car with existing plate.
- The created car must be available by default.
- The user responsible for creating the cars must be an admin.


# Cars Listing
**Functional Requirements**
- It must be possible to list all available cars.
- It must be possible to list all available cars by category.
- It must be possible to list all available cars by brand.
- It must be possible to list all available cars by name.

**Business Rules**
- User doesn't have to be authenticated to perform this action.


# Car's Specification Creation
**Functional Requirements**
- It must be possible to create a new car's specification.
- It must be possible to list all car's specifications.
- It must be possible to list all cars.

**Business Rules**
- It must not be possible to create a specification for an unexistent car.
- It must not be possible to create an already existing specification for the same car.
- The user responsible for creating the specification must be an admin.


# Car's Image Upload
**Functional Requirements**
- It must be possible to upload a car's image

**Non Functional Requirements**
- Use multer for file upload.

**Business Rules**
- It must be possible for the user to upload more than one image for the car.
- The user responsible for uploading the image must be an admin.


# Car's Renting
**Functional Requirements**
- It must be possible to rent a car.

**Business Rules**
- The renting must have a 24h duration.
- It must not be possible to rent a car for a user that already has a renting registered.
- It must not be possible to rent an already rented car.
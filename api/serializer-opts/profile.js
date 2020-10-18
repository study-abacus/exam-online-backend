const TeacherSerializerOpts = require('./teacher');

module.exports = () => ({
  attributes: [
    'id',
    'school',
    'class',
    'guardianName',
    'contact',
    'address',
    'city',
    'country',
    'currentCourse',
    'currentLevel',
    'otherTeacher',
    'teacher'
  ],
  teacher: {
    ref: 'id',
    ...TeacherSerializerOpts()
  }
})

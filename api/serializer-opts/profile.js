const TeacherSerializerOpts = require('./teacher');

module.exports = (model, type = 'serialize') => {
  if (type === 'deserialize') {
    return {
      teachers: {
        valueForRelationship: relationship => ({ id: relationship.id })
      }
    }
  }

  return {
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
  }
}

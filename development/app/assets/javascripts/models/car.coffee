Admin.Car = DS.Model.extend
  title: DS.attr("string")
  description: DS.attr("string")
  color: DS.attr("string")
  car_image: DS.belongsTo('Admin.CarImage')

  fileuploads: ["car_image"]
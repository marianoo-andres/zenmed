'use strict';

var mongoose = require('mongoose'),
  Specialities = mongoose.model('Specialities'),
  Users = mongoose.model('Users'),
  Doctors = mongoose.model('Doctors'),
  Patients = mongoose.model('Patients');

exports.create_all = function(req, res) {
  Specialities.collection.insert(specialities, function(err, docs){
     
  });
  doctors.forEach(d => {
    Users.collection.insert(d.user, function(err, docs){
      
    });
    Doctors.collection.insert(d.doctor, function(err, docs){
      
    });
  })
  res.json({ 'created': true });
};

exports.delete_all = function(req, res){
  Specialities.collection.remove({}, function(err, docs){
    if(err)
      res.json({ 'removed': false, error: err });
    else{
      Users.collection.remove({}, function(err, docs){
        if(err)
          res.json({ 'removed': false, error: err });
        else{
          Doctors.collection.remove({}, function(err, docs){
            if(err)
              res.json({ 'removed': false, error: err });
            else{
              Patients.collection.remove({}, function(err, docs){
                if(err)
                  res.json({ 'removed': false, error: err });
                else{
                  
                }
              })  
            }
          })
        }
      })
    }
  });
  res.json({ 'removed': true });
}

var doctors = [
  { user : { username:'doctor1', password:'supersegura', role:'Doctor'}, 
    doctor: { name:'Gaston', lastName:'Perez', cuit:123123123123123, registrationNumber:123123123,
              specialities:[ { description: 'PEDIATRÍA' } ]
            }
  }
]

var specialities = [
  { description: 'ALERGIA E INMUNOPATOLOGIA' },
  { description: 'ALERGIA' },
  { description: 'ANATOMIA PATOLOGICA' },
  { description: 'ANESTESIA' },
  { description: 'ANGIOLOGIA GENERAL Y HEMODINAMIA' },
  { description: 'BACTERIOLOGIA' },
  { description: 'CARDIOLOGIA INFANTIL' },
  { description: 'CARDIOLOGIA' },
  { description: 'CIRUGIA PLASTICA Y REPARADORA' },
  { description: 'CIRUGIA TORACICA' },
  { description: 'CIRUGIA DE CABEZA Y CUELLO' },
  { description: 'CIRUGIA GENERAL' },
  { description: 'CIRUGIA CARDIOVASCULAR' },
  { description: 'CIRUGIA VASCULAR PERIFERICA' },
  { description: 'CIRUGIA INFANTIL' },
  { description: 'CLINICA MEDICA: Medicina Interna' },
  { description: 'DERMATOLOGIA' },
  { description: 'DERMATOSIFILOGRAFIA' },
  { description: 'DIAGNOSTICO POR IMAGENES' },
  { description: 'ENDOCRINOLOGIA' },
  { description: 'ENDOSCOPIA DIGESTIVA' },
  { description: 'ENFERMEDADES INFECCIOSAS: Infectología' },
  { description: 'EPIDEMIOLOGIA' },
  { description: 'FARMACOLOGIA' },
  { description: 'FISITRIA:Medicina Física y Rehabilitación' },
  { description: 'GASTROENTEROLOGIA' },
  { description: 'GENETICA MEDICA' },
  { description: 'GERIATRIA' },
  { description: 'GINECOLOGIA' },
  { description: 'HEMATOLOGIA' },
  { description: 'HEMOTERAPIA E INMUNOHEMATOLOGIA' },
  { description: 'HEMOTERAPIA' },
  { description: 'HIGIENE INDUSTRIAL' },
  { description: 'HIGIENE Y MEDICINA PREVENTIVA' },
  { description: 'INMUNOLOGIA' },
  { description: 'LEPROLOGIA' },
  { description: 'MASTOLOGIA' },
  { description: 'MEDICINA LEGAL' },
  { description: 'MEDICINA NUCLEAR' },
  { description: 'MEDICINA SANITARIA' },
  { description: 'MEDICINA DEL TRABAJO' },
  { description: 'MEDICINA FAMILIAR' },
  { description: 'MEDICINA AERONAUTICA Y ESPACIAL' },
  { description: 'MEDICINA DEL DEPORTE' },
  { description: 'NEFROLOGIA' },
  { description: 'NEONATOLOGIA' },
  { description: 'NEUMONOLOGIA' },
  { description: 'NEUROCIRUGIA' },
  { description: 'NEUROLOGIA INFANTIL' },
  { description: 'NEUROLOGIA' },
  { description: 'NUTRICION' },
  { description: 'OBSTETRICIA' },
  { description: 'OFTALMOLOGIA' },
  { description: 'ONCOLOGIA (Clínica)' },
  { description: 'ORTOPEDIA Y TRAUMATOLOGIA' },
  { description: 'OTORRINOLARINGOLOGIA' },
  { description: 'PEDIATRIA (Clínica Pediátrica)' },
  { description: 'PROCTOLOGIA' },
  { description: 'PSICOLOGIA MEDICA (Clínica)' },
  { description: 'PSIQUIATRIA' },
  { description: 'PSIQUIATRIA INFANTIL' },
  { description: 'QUEMADOS' },
  { description: 'RADIOLOGIA' },
  { description: 'RADIOTERAPIA (Terapia Radiante)' },
  { description: 'REUMATOLOGIA' },
  { description: 'SALUD PUBLICA' },
  { description: 'TERAPIA INTENSIVA' },
  { description: 'TISIOLOGIA' },
  { description: 'TISIONEUMONOLOGIA' },
  { description: 'TOCOGINECOLOGIA' },
  { description: 'TOXICOLOGIA' },
  { description: 'UROLOGIA' },
  { description: 'AGENDA' },
  { description: 'ACTIVIDADES AMA' }
]
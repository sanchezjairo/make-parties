module.exports = function (app, models) {
 // Index
 app.get('/', (req, res) => {
    models.Event.findAll({ order: [['createdAt', 'DESC']] }).then(events => {
      res.render('events-index', { events: events });
    })
  })


// CREATE
 app.post('/events', (req, res) => {
    models.Event.create(req.body).then(event => {
      // Redirect to events/:id
      res.redirect(`/events/${event.id}`)
    }).catch((err) => {
      console.log(err)
    });
  });

// NEW
 app.get('/events/new', (req, res) => {
    res.render('events-new', {});
  })

// SHOW
 app.get('/events/:id', (req, res) => {
    models.Event.findByPk(req.params.id, { include: [{ model: models.Rsvp }] }).then(event => {
        let createdAt = event.createdAt;
        createdAt = moment(createdAt).format('MMMM Do YYYY, h:mm:ss a');
        event.createdAtFormatted = createdAt;
        res.render('events-show', { event: event });
    }).catch((err) => {
        console.log(err.message);
    })
});

// EDIT
 app.get('/events/:id/edit', (req, res) => {
    models.Event.findByPk(req.params.id).then((event) => {
      res.render('events-edit', { event: event });
    }).catch((err) => {
      console.log(err.message);
    })
  });


// UPDATE
 app.put('/events/:id', (req, res) => {
    models.Event.findByPk(req.params.id).then(event => {
      event.update(req.body).then(event => {
        res.redirect(`/events/${req.params.id}`);
      }).catch((err) => {
        console.log(err);
      });
    }).catch((err) => {
      console.log(err);
    });
  });

// DELETE
 app.delete('/events/:id', (req, res) => {
    models.Event.findByPk(req.params.id).then(event => {
      event.destroy();
      res.redirect(`/`);
    }).catch((err) => {
      console.log(err);
    });
  })

}

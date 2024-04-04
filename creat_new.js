/* Create a new employee */
router.post('/', async (req, res, next) => {
    try {
      const { name, job } = req.body;
      await schema.validateAsync({ name, job });
  
      const employee = await employees.findOne({
        name,
      });
  
      // Employee already exists
      if (employee) {
        const error = new Error('Employee already exists');
        res.status(409); // conflict error
        return next(error);
      }
  
      const newuser = await employees.insert({
        name,
        job,
      });
  
      res.status(201).json(newuser);
    } catch (error) {
      next(error);
    }
  });
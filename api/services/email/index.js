const sgMail = require('@sendgrid/mail')
const config = require('config');
const TemplateMap = require('./template-maps');

class EmailService {
  constructor(app) {
    this._app = app;
    sgMail.setApiKey(config.SENDGRID.KEY);
  }

  get templateMap() {
    return TemplateMap;
  }

  sendViaTemplate(templateId, {
    to,
    templateData
  }) {
    return sgMail.send({
      templateId,
      to,
      from: 'info@studyabacus.com',
      dynamic_template_data: templateData
    })
  }
}

module.exports = EmailService;

const mongoose = require('mongoose');

const ProspectSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phone: { type: String, required: true, unique: true },
  prospectType: { type: String },
  location: { type: String },
  street: { type: String  },

  gender: { type: String  },
  birth: { type: String  },
  height: { type: String  },
  weight: { type: String  },
  tobacco: { type: String  },
  relation: { type: String  },

  maritalStatus: { type: String  },
  preexistingConditions: { type: String  },
  typeOfCondition: { type: String  },
  peopleInHousehold: { type: String },
  annualIncome: { type: String },

  selfEmployed: { type: String  },
  qualifyingLifeEvent: { type: String  },
  expectantParent: { type: String  },
  medications: { type: String  },
  healthOfCondition: { type: String  },
  deniedCoverage: { type: String  },
  treatedByPhysician: { type: String  },
  planTypes: { type: String  },
  optionalCoverage: { type: String  },

  currentlyInsured: { type: String  },
  policyExpires: { type: String  },
  coveredFor: { type: String  },
  currentProvider: { type: String  },

  type: { type: String  },
  leadVendor: { type: String  },
  campaign: { type: String  },

  createdAt: { type: Date  },

});

module.exports = mongoose.model('prospects', ProspectSchema);

const { StatusCodes } = require("http-status-codes");
const bikesCollection = require("./bike.schema");

module.exports = {
  getBikes(request, response) {
    getBikeFn()
      .then((bikes) => {
        response.write(JSON.stringify(bikes));
        response.end();
      })
      .catch((error) => response.sendStatus(StatusCodes.INTERNAL_SERVER_ERROR));
  },
  createBikes(request, response) {
    createBikeFn(request.body)
      .then((bikes) => {
        response.write(JSON.stringify(bikes));
        response.end();
      })
      .catch((error) => response.sendStatus(StatusCodes.INTERNAL_SERVER_ERROR));
  },
  getBikesByID(request, response) {
    const id = request.params.id;

    getBikesByIDFn(id)
      .then((bikes) => {
        response.write(JSON.stringify(bikes));
        response.end();
      })
      .catch((error) => response.sendStatus(StatusCodes.INTERNAL_SERVER_ERROR));
  },
  toggleBikeActive(request, response) {
    const id = request.params.id;

    toggleBikeActiveFn(id)
      .then((bikes) => {
        response.write(JSON.stringify(bikes));
        response.end();
      })
      .catch((error) => response.sendStatus(StatusCodes.INTERNAL_SERVER_ERROR));
  },
  deleteBikes(request, response) {
    const id = request.params.id;

    deleteBikesFn(id)
      .then((bikes) => {
        response.write(JSON.stringify(bikes));
        response.end();
      })
      .catch((error) => response.sendStatus(StatusCodes.INTERNAL_SERVER_ERROR));
  },
};

async function getBikeFn() {
  return bikesCollection.find();
}
async function createBikeFn(bikesProps) {
  return new bikesCollection(bikesProps).save();
}
async function getBikesByIDFn(id) {
  const bikeFound = await bikesCollection.findById(id);
  if (!bikeFound) {
    throw new Error("bike not found");
  }
  return bikeFound;
}
async function toggleBikeActiveFn(id) {
  const bikeFound = await getBikesByIDFn(id);
  return bikesCollection.findByIdAndUpdate(
    id,
    {
      isActive: !bikeFound.isActive,
    },
    {
      new: true,
    }
  );
}
async function deleteBikesFn(id) {
  return bikesCollection.findByIdAndDelete(id);
}

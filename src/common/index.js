export function convertGalleryArrayToString(instance, fileName) {
  instance.filename = fileName[0]?.fileUrl || "";
  let tempBus = { ...instance.business };
  let tempUser = { ...instance.user };
  tempBus.gallery =
    instance.business.gallery && JSON.stringify(instance.business.gallery);
  instance.business = tempBus;
  tempUser.business = tempBus;
  instance.user = tempUser;
}

export const isFulfilled = (response) =>
  response &&
  response.type &&
  response.type.endsWith("fulfilled")

export const isNullOrEmpty = (element) =>
  !element || typeof element !== "object";

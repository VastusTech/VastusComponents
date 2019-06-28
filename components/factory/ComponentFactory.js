export type ComponentInfo = {
  fetchList: [string],
  ifSubscribe: boolean,
  dependencyInfo: Object<string, ComponentInfo>,
};

/**
 *
 * @param componentName
 * @return {ComponentInfo} The info of the component to retrieve.
 */
const getComponentInfo = (componentName) => {
  switch (componentName) {
    case "ChallengeCard":
      return require("../cards/ChallengeCard").ChallengeCardInfo;
    default:
      throw new Error("Component Info");
  }
};

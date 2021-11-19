const { CustomError } = require("./utils");

const retryer = async (fetcher, variables, retries = 0) => {
  if (retries > 7) {
    throw new CustomError("Maximum retries exceeded", CustomError.MAX_RETRY);
  }
  try {
    // try to fetch with the first token since RETRIES is 0 index i'm adding +1
    const response = await fetcher(
      variables,
      // process.env[`PAT_${retries + 1}`],
      core.getInput('pat_1'),
      retries,
    ).then( resp => {

      console.log("resp from response in retryer ", resp)
      return resp 
    
    })

    // console.log(response)

    // // prettier-ignore
    // const isRateExceeded = response.data.errors && response.data.errors[0].type === "RATE_LIMITED";

    // // if rate limit is hit increase the RETRIES and recursively call the retryer
    // // with username, and current RETRIES
    // if (isRateExceeded) {
    //   console.log.log(`PAT_${retries + 1} Failed`);
    //   retries++;
    //   // directly return from the function
    //   return retryer(fetcher, variables, retries);
    // }

    // // finally return the response
    return response;
  } catch (err) {
    // prettier-ignore
    // also checking for bad credentials if any tokens gets invalidated
    // const isBadCredential = err.response.data && err.response.data.message === "Bad credentials";

    // if (isBadCredential) {
    //   console.log(`PAT_${retries + 1} Failed`);
    //   retries++;
    //   // directly return from the function
    //   return retryer(fetcher, variables, retries);
    // }
  }
};

module.exports = retryer;
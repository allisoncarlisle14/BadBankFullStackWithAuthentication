
// Use this code snippet in your app.
// If you need more information about configurations or implementing the sample code, visit the AWS docs:
// https://docs.aws.amazon.com/sdk-for-javascript/v3/developer-guide/getting-started.html

import {
    SecretsManagerClient,
    GetSecretValueCommand,
  } from "@aws-sdk/client-secrets-manager";
  
  const FCAPIKey_secretName = "firebaseConfigApiKey";
  const FCAuthDomain_secretName = "firebaseConfigAuthDomain";
  const FCprojectId_secretName = "firebaseConfigProjectId";
  const FCstorageBucket_secretName = "firebaseConfigStorageBucket";
  const FCmessagingSendingId_secretName = "firebaseConfigMessagingSenderId";
  const FCappId_secretName = "firebaseConfigAppId";
  
  const client = new SecretsManagerClient({
    region: "us-west-1",
  });
  
  let apiKeyresponse;
  let authDomainresponse;
  let projectIdresponse;
  let storageBucketresponse;
  let messagingSenderresponse;
  let appIdresponse;
  
  try {
    apiKeyresponse = await client.send(
      new GetSecretValueCommand({
        SecretId: FCAPIKey_secretName,
        VersionStage: "AWSCURRENT", // VersionStage defaults to AWSCURRENT if unspecified
      })
    );
  } catch (error) {
    // For a list of exceptions thrown, see
    // https://docs.aws.amazon.com/secretsmanager/latest/apireference/API_GetSecretValue.html
    throw error;
  }
  
  try {
    authDomainresponse = await client.send(
      new GetSecretValueCommand({
        SecretId: FCAuthDomain_secretName,
        VersionStage: "AWSCURRENT", // VersionStage defaults to AWSCURRENT if unspecified
      })
    );
  } catch (error) {
    // For a list of exceptions thrown, see
    // https://docs.aws.amazon.com/secretsmanager/latest/apireference/API_GetSecretValue.html
    throw error;
  }

  try {
    projectIdresponse = await client.send(
      new GetSecretValueCommand({
        SecretId: FCprojectId_secretName,
        VersionStage: "AWSCURRENT", // VersionStage defaults to AWSCURRENT if unspecified
      })
    );
  } catch (error) {
    // For a list of exceptions thrown, see
    // https://docs.aws.amazon.com/secretsmanager/latest/apireference/API_GetSecretValue.html
    throw error;
  }


  try {
    storageBucketresponse = await client.send(
      new GetSecretValueCommand({
        SecretId: FCstorageBucket_secretName,
        VersionStage: "AWSCURRENT", // VersionStage defaults to AWSCURRENT if unspecified
      })
    );
  } catch (error) {
    // For a list of exceptions thrown, see
    // https://docs.aws.amazon.com/secretsmanager/latest/apireference/API_GetSecretValue.html
    throw error;
  }

  try {
    messagingSenderresponse = await client.send(
      new GetSecretValueCommand({
        SecretId: FCmessagingSendingId_secretName,
        VersionStage: "AWSCURRENT", // VersionStage defaults to AWSCURRENT if unspecified
      })
    );
  } catch (error) {
    // For a list of exceptions thrown, see
    // https://docs.aws.amazon.com/secretsmanager/latest/apireference/API_GetSecretValue.html
    throw error;
  }

  try {
    appIdresponse = await client.send(
      new GetSecretValueCommand({
        SecretId: FCappId_secretName,
        VersionStage: "AWSCURRENT", // VersionStage defaults to AWSCURRENT if unspecified
      })
    );
  } catch (error) {
    // For a list of exceptions thrown, see
    // https://docs.aws.amazon.com/secretsmanager/latest/apireference/API_GetSecretValue.html
    throw error;
  }
  
  const apiKey = apiKeyresponse.SecretString;
  const authDomain = authDomainresponse.SecretString;
  const projectId = projectIdresponse.SecretString;
  const storageBucket = storageBucketresponse.SecretString;
  const messagingSenderId = messagingSenderresponse.SecretString;
  const appId = appIdresponse.SecretString;
  
  (function() {
  // Your web app's Firebase configuration
  const firebaseConfig = {
    apiKey,
    authDomain, 
    projectId,
    storageBucket,
    messagingSenderId,
    appId
  };
  
  firebase.initializeApp(firebaseConfig);
  
  }());
  
  
  
  
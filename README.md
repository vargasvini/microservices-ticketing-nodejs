# microservices-ticketing-nodejs

### TS not globlal

npx -p typescript tsc --init

#### test packages

yarn add --save-dev @types/jest @types/supertest jest ts-jest supertest mongodb-memory-server

### Create secret to share/access between containers

kubectl create secret generic jwt-secret --from-literal=JWT_KEY=????

kubectl get secrets

### In case of errors

kubectl describe pod {POD_ID}

### K8s inspect files

kubectl get pods

kubectl exec -it auth-depl-69fb49cf4b-7j6t8 sh

cd node_modules

cd @goustiee-org

cd build/common

cat package.json

## NPM Common package

### The common library will be written as TS and published as JS (to avoid compatibility problems)

### Increment version: 1.0.1

npm version patch

npm run build

npm login

npm publish --access public

### NATS

### ONLY FOR TEST NATS OUTSIDE THE CLUSTER

kubectl port-forward {NATS-POD-NAME} 4222:4222

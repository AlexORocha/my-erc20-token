# Repositório da Emissão de um Token ERC-20

Este repositório contém o código necessário para realizar a emissão e depósito de um Token no padrão do protocolo ERC-20.

A proposta deste repositório é entender como realizar a emissão de um Token ERC-20 em compliance da legislação atual do Brasil.

# Tecnologia

## Compilação

Para compilar o contrato, execute o comando abaixo:

```bash
truffle compile
```

## Deploy

Para realizar o deploy do contrato, execute o comando abaixo:

```bash
truffle migrate --network development # Se for executado em uma rede local com Ganache
truffle migrate --network sepolia # Se for Testnet
```
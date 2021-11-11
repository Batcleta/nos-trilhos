# Software de controle de gastor

MVP
 - Imput de despesas

    - Compras normais
        - Data da Compra
        - Categoria da Compra
        - Descrição da Compra
        - Valor total da Compra
        - caso seja parcelada
            - Número de parcelas
            - Primeiro pagamento ( padrão no proximo echamento da fatura)

            { # Compras
                dataCompra: {
                    type: DataTypes.DATE,
                    allowNull: false
                }, 
                descriçãoCompra:{
                    type: DataTypes.STRING,
                    allowNull: false
                },
                totalCompra:{
                    type: DataTypes.INTEGER,
                    allowNull: false
                }

                hasMany(parcelas,{ as: compraId} )
                hasOne( categoria ,{ as: categoriaId})
            },

            { # parcelas

                ParcelaCompra: {
                    type: DataTypes.INTEGER,
                    allowNull: false
                },

                valorCompra:{
                    type: DataTypes.INTEGER,
                    allowNull: false
                },
                numeroParcela:{
                    type: DataTypes.INTEGER,
                    allowNull: false
                }
                vencimentoParcela:{
                    type: DataTypes.DATE,
                    allowNull: false
                }

            },

            { # Categorias

                tipoCategoria:{
                    type: DataTypes.INTEGER,
                    allowNull: false
                },

                descricaoCategoria:{
                    type: DataTypes.STRING,
                    allowNull: false
                }

                hasmany(compras, renda, contas)
            },

    - Despesas fixas
        - Dia do vencimento da conta
        - Descrição da conta
        - Categoria da conta


 - Imput de Renda

    - Renda fixa
        - Salário
            - Data de recebimento
            - Valor da renda

        - Renda variável
            - Data de recebimento
            - Valor da renda

 - dashboard

    - Mostrar o total das despesas
    - Mostrar o total das rendas
    - Mostra lista de despesas e renda padrão nubank com cores


# Ideias de atualizações

- Filtro de despesas pela categoria da despesa e pelo item adquirido
- Abatimento de contas para controle de pagamento ( dar baia nas compras)
- Importação de despesas por csv do nubank e outro bancos
- sistema de adiantamento de parcelas
- Cadastro de cartão para informar a data de vencimento da fatura e data de fechamento do cartão
-- O usuário escolhe o cartão na hora da compra e fica a par com mais facilidade do calculo automático do vencimento das parcels
Pagamento parcelado deverá ter opção de parcelamento com juros
-- Opção de calculo de juros baseado no valor pago, quantidade de parcelas e valor das parcelas

-Abatimento de compras
--No caso de uma compra parcelada, ao fecha ruma parcela, conferir se a mesma possui parcelas com status true. Caso nao exista, o status da compra ser´atualizado para false e a compra será 100% abatida

-Abatimento de contas
--Ao abater uma conta, caso ela seja abatida dentro do prazo de vencimento, 
será apenas criada uma conta para o mes seguinte. Caso seja criada fora do prazo, perguntar se a conta
foi paga dentro do prazo de vencimento.
--Ao abater fora do prazo de vencimento, informar a possibilidade de alterar o valor com os juros etc...

--Ao pagar a ultima conta do ano, pergunta se deseja renovar assinatura por mais um ano

-- Considerar valor de reajuste do contrato

#Features
-- Limitar os gastos das contas por categoria
-- Dashboard - Visualização de gastos por categoria com barra de progresso em cores
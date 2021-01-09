module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn(
      'invoices',
      'client_id',
      {
        type: Sequelize.INTEGER,
        references: {
          model: 'clients',
          key: 'id',
          onUpdate: 'CASCADE',
          onDelete: 'SET NULL',
          allowNull: true,
        },
      }
    );
  },

  down: async (queryInterface) => {
    await queryInterface.removeColumn('invoices', 'client_id');
  }
};

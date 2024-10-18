
module.exports = {
    up: async ({ context: queryInterface }) => {
        await queryInterface.dropTable('users');
        await queryInterface.dropTable('blogs');
    }
}

var Externallinks = ExClass(H5ComponentBase, {
    initialize: function($super, name, cfg) {
        $super(name);
        this.cfg = cfg;
    },
    getName: function($super) {
        return $super("Employee name: ");
    }
});

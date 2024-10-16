
AFRAME.registerComponent('events-object-configuration', {
    schema: {
        objectStage: { type: 'string', default: '' },
        objectType: { type: 'string', default: '' },
        nameObjectGLB: { type: 'string', default: '' },
    },

    init: function () {
        //console.log("################## menu-object INIT ");
        this.customizeObjectStage();
        this.handleClick = this.handleClick.bind(this);
        this.el.addEventListener('click', this.handleClick);
        this.menuConfiguration = this.el.parentNode.parentNode;
    },

    update: function () {
        //console.log("################## events-object-configuration UPDATE ");
    },

    customizeObjectStage: function () {
        //console.log("################## menu-object customizeObjectStage ##################");
        //this.el.setAttribute('id', this.data.objectStage);
        this.el.setAttribute('gltf-model', 'assets/real/' + this.data.nameObjectGLB + '.glb');
        this.el.setAttribute('scale', '0.2 0.2 0.2');
        this.el.setAttribute('animation', {
            'property': 'rotation',
            'to': '0 360 0',
            'dur': '15000',
            'easing': 'linear',
            'loop': 'true'
        });

        //top name object
        let entityObjectChildren = document.createElement('a-entity');
        entityObjectChildren.classList.add("topNameObject");
        entityObjectChildren.setAttribute('text', {
            'value': this.data.objectStage,
            'align': 'center',
            'side': 'double',
            'color': 'WHITE',
            'shader': 'msdf',
            'font': 'https://raw.githubusercontent.com/etiennepinchon/aframe-fonts/master/fonts/berkshireswash/BerkshireSwash-Regular.json'
        });
        entityObjectChildren.setAttribute('scale', '50 50 50');
        entityObjectChildren.setAttribute('position', { x: 0, y: this.el.getAttribute('position').y + 1.5, z: 0 });
        this.el.appendChild(entityObjectChildren);
    },

    handleClick: function (evt) {
        //console.log("################## menu-object click");
        let self = this;
        let disco = self.el.parentNode;
        let objectsDisco = disco.childNodes;

        //Recorremos los objectos del disco
        objectsDisco.forEach(function (object) {
            //Eliminamos animaciones y eventos del objecto
            object.removeAttribute('animation');

            //Los objectos que no son selecionados cambiamos su apariencia
            if (object !== self.el) {
                object.childNodes[0].setAttribute('text', 'opacity', '0.3');
                object.object3D.traverse((value) => {
                    if (value.type === 'Mesh') {
                        const material = value.material;
                        material.transparent = true;
                        material.opacity = 0.3;
                    }
                })
                object.classList.remove("selected");
            }else{
                object.childNodes[0].setAttribute('text', 'opacity', '1');
                object.object3D.traverse((value) => {
                    if (value.type === 'Mesh') {
                        const material = value.material;
                        material.transparent = true;
                        material.opacity = 1;
                    }
                })
                object.classList.add("selected");
            }
        });

        //Eliminamos animancaciones del disco
        disco.removeAttribute('animation');

        //enviamos al componente config los datos
        this.menuConfiguration.setAttribute('configuration', {
            typeObjectSelected: this.data.objectType,
            valueObjectSelected: this.data.objectStage,
        });
    },
});
/**
 * Program IDL in camelCase format in order to be used in JS/TS.
 *
 * Note that this is only a type helper and is not the actual IDL. The original
 * IDL can be found at `target/idl/counter.json`.
 */
export type Counter = {
  address: '3wWvigDmpRgMfpoXZkJx2vt951o4FRvECc5z3FxSVseF';
  metadata: {
    name: 'counter';
    version: '0.1.0';
    spec: '0.1.0';
    description: 'Created with Anchor';
  };
  instructions: [
    {
      name: 'createQuestion';
      discriminator: [222, 74, 49, 30, 160, 220, 179, 27];
      accounts: [
        {
          name: 'question';
          writable: true;
          pda: {
            seeds: [
              {
                kind: 'arg';
                path: 'id';
              },
              {
                kind: 'account';
                path: 'owner';
              }
            ];
          };
        },
        {
          name: 'owner';
          writable: true;
          signer: true;
        },
        {
          name: 'systemProgram';
          address: '11111111111111111111111111111111';
        }
      ];
      args: [
        {
          name: 'id';
          type: 'string';
        },
        {
          name: 'text';
          type: 'string';
        }
      ];
    },
    {
      name: 'deleteQuestion';
      discriminator: [157, 108, 81, 22, 30, 165, 196, 123];
      accounts: [
        {
          name: 'question';
          writable: true;
          pda: {
            seeds: [
              {
                kind: 'arg';
                path: 'id';
              },
              {
                kind: 'account';
                path: 'owner';
              }
            ];
          };
        },
        {
          name: 'owner';
          writable: true;
          signer: true;
        },
        {
          name: 'systemProgram';
          address: '11111111111111111111111111111111';
        }
      ];
      args: [
        {
          name: 'id';
          type: 'string';
        }
      ];
    },
    {
      name: 'updateQuestion';
      discriminator: [3, 88, 210, 44, 238, 36, 201, 151];
      accounts: [
        {
          name: 'question';
          writable: true;
          pda: {
            seeds: [
              {
                kind: 'arg';
                path: 'id';
              },
              {
                kind: 'account';
                path: 'owner';
              }
            ];
          };
        },
        {
          name: 'owner';
          writable: true;
          signer: true;
        },
        {
          name: 'systemProgram';
          address: '11111111111111111111111111111111';
        }
      ];
      args: [
        {
          name: 'id';
          type: 'string';
        },
        {
          name: 'text';
          type: 'string';
        }
      ];
    }
  ];
  accounts: [
    {
      name: 'questionState';
      discriminator: [31, 130, 36, 192, 203, 204, 21, 247];
    }
  ];
  types: [
    {
      name: 'questionState';
      type: {
        kind: 'struct';
        fields: [
          {
            name: 'owner';
            type: 'pubkey';
          },
          {
            name: 'id';
            type: 'string';
          },
          {
            name: 'text';
            type: 'string';
          }
        ];
      };
    }
  ];
};

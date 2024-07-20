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
      name: 'createJob';
      discriminator: [178, 130, 217, 110, 100, 27, 82, 119];
      accounts: [
        {
          name: 'job';
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
          name: 'title';
          type: 'string';
        },
        {
          name: 'questionSet';
          type: 'string';
        }
      ];
    },
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
      name: 'createQuestionSet';
      discriminator: [162, 117, 193, 74, 89, 229, 99, 123];
      accounts: [
        {
          name: 'questionSet';
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
          name: 'title';
          type: 'string';
        },
        {
          name: 'questions';
          type: {
            vec: 'string';
          };
        }
      ];
    },
    {
      name: 'deleteJob';
      discriminator: [126, 220, 31, 28, 47, 124, 31, 145];
      accounts: [
        {
          name: 'job';
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
      name: 'deleteQuestionSet';
      discriminator: [227, 30, 229, 252, 34, 101, 174, 206];
      accounts: [
        {
          name: 'questionSet';
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
      name: 'updateJob';
      discriminator: [83, 224, 93, 51, 200, 36, 89, 214];
      accounts: [
        {
          name: 'job';
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
          name: 'title';
          type: 'string';
        },
        {
          name: 'questionSet';
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
    },
    {
      name: 'updateQuestionSet';
      discriminator: [188, 98, 127, 78, 201, 30, 105, 79];
      accounts: [
        {
          name: 'questionSet';
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
          name: 'title';
          type: 'string';
        },
        {
          name: 'questions';
          type: {
            vec: 'string';
          };
        }
      ];
    }
  ];
  accounts: [
    {
      name: 'jobState';
      discriminator: [95, 104, 196, 170, 253, 67, 75, 2];
    },
    {
      name: 'questionSetState';
      discriminator: [200, 127, 50, 187, 32, 198, 43, 140];
    },
    {
      name: 'questionState';
      discriminator: [31, 130, 36, 192, 203, 204, 21, 247];
    }
  ];
  types: [
    {
      name: 'jobState';
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
            name: 'title';
            type: 'string';
          },
          {
            name: 'questionSet';
            type: 'string';
          }
        ];
      };
    },
    {
      name: 'questionSetState';
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
            name: 'title';
            type: 'string';
          },
          {
            name: 'questions';
            type: {
              vec: 'string';
            };
          }
        ];
      };
    },
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
